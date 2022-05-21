import { Box, Card, Typography } from '@mui/material'

const Footer = () => {
  return (
    <footer style={{ height: '50px' }}>
      <Box>
        <Card
          square
          sx={{
            mt: '30px',
            height: '40px',
            p: 1,
            textAlign: 'center',
            background: '#000000',
            border: 3,
            borderColor :'#c99906'
          }}
        >
          <Typography color='white'>UCLA 2022 Spring ECE188 | CLASSify</Typography>
        </Card>
      </Box>
    </footer>
  )
}

export default Footer
