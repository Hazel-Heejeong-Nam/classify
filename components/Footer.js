import { Box, Card, Typography } from '@mui/material'

const Footer = () => {
  return (
    <footer style={{ height: '40px' }}>
      <Box>
        <Card
          square
          sx={{
            mt: '30px',
            height: '40px',
            p: 1,
            textAlign: 'center',
            background: '#1976d2',
          }}
        >
          <Typography color='white'>Footer</Typography>
        </Card>
      </Box>
    </footer>
  )
}

export default Footer
