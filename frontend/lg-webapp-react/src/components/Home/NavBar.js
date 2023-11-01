import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    My Website
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/admin">Admin</Button>
                <Button color="inherit" component={Link} to="/posts">Posts</Button>
                <Button color="inherit" component={Link} to="/products">Products</Button>
                {/* Add more links as needed */}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;