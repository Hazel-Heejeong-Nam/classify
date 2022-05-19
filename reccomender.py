from sklearn.neighbors import NearestNeighbors
import numpy as np

def make_recommendations(users):
    """Predicts how well a user might like an unrated class"""

    # Find unique users and classes
    unique_users = {user["username"] for user in users}
    unique_classes = set()

    for user in users:
        if 'ratings' in user:
            unique_classes |= set(user["ratings"].keys())

    # Primary lists of users and 
    unique_users = list(unique_users)
    unique_classes = list(unique_classes)

    # Note the indicies they are given
    users_to_idx = {user:i for i, user in enumerate(unique_users)}
    classes_to_idx = {class_name:i for i, class_name in enumerate(unique_classes)}

    # Build the user item marix which contains users and class ratings 
    user_item = np.zeros((len(unique_users), len(unique_classes)))

    for ui, user_name in enumerate(unique_users):
        for i, user in enumerate(users):
            if user["username"] == user_name:
                idx = i
                break

        if 'ratings' in users[idx]:
            for ci, class_name in enumerate(unique_classes):
                if class_name in users[idx]["ratings"]:
                    user_item[ui, ci] = users[idx]["ratings"][class_name] if users[idx]["ratings"][class_name] < 5 else 5.

    # Use knn to find most similar classes
    knn = NearestNeighbors(metric='cosine', algorithm='brute')
    knn.fit(user_item.T)
    distances, indices = knn.kneighbors(user_item.T, n_neighbors=3)

    # Make reccs for each user
    for user in users:
        user["recommendations"] = {}

        if 'ratings' in user:
            ui = users_to_idx[user["username"]]

            # Find all classes the user has not rated
            unrated_classes = []
            for k, v in user["ratings"].items():
                # If a class is unrated, add the closest ones 
                if v == 0:
                    unrated_classes.append(classes_to_idx[k])

            potential_recs = []

            # For each of these classes, find the most similar classes
            for k in unrated_classes:
                close_classes = indices[k, :]
                close_classe_dists = distances[k, :]

                # Remove the same class from recommendations
                close_classe_dists = close_classe_dists[close_classes != k]
                close_classes = close_classes[close_classes != k]
                    

                # Predict rating for this class using the distance to scale the ratings 

                r_rec = (user_item[ui, close_classes]*(1 - close_classe_dists))
                r_rec = np.sum(r_rec)/np.sum(1 - close_classe_dists)
                potential_recs.append((k, r_rec/5.))


            userrecs = sorted(potential_recs, key=lambda x: x[1])
            user["recommendations"] = {unique_classes[i]: s for i,s in userrecs}

    return users

from pymongo import MongoClient
import pymongo

# Provide the mongodb atlas url to connect python to mongodb using pymongo
CONNECTION_STRING = "mongodb+srv://admin:admin@cluster0.c1urf.mongodb.net/?retryWrites=true&w=majority"
      
def main():

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Format users
    users = client['classify']['users'].find()
    updated_users = []
    for user in users:
        updated_user = {'username': user['username']}
        ratings = {}
        if 'ratings' in user:
            for rating in user['ratings']:
                ratings[f'{rating["course"]}'] = int(rating['rating'])
            updated_user['ratings'] = ratings
        updated_users.append(updated_user)

    # Make reccomendations
    updated_users = make_recommendations(updated_users)

    # Update Database
    for user in updated_users:
        client['classify']['users'].find_one_and_update({"username" : user['username']}, {'$set': {'recommendations': user['recommendations']}})

if __name__ == "__main__":
    main()