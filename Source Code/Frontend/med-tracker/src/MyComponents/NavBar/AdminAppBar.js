import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import logo from '../../assets/images/logos/medTracker.png'
import TokenIcon from '@mui/icons-material/Token';

const StyledToggleButton = styled(ToggleButton)`
  && {
    transition: background-color 0.2s ease-in-out;
    border-radius: 1px;
    margin: 10px 0;
    color: black;
    border: none;
  }
  &&:hover {
    background-color: #c1c2c9;
    color: black;
  }
  &&.Mui-selected {
    background-color: #085598;
    color: white;
  }
  &&.Mui-selected:hover {
    background-color: #085598;
    color: white;
  }
`;

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function AdminAppBar(props) {

    const navigate = useNavigate();

    const [headerValue, setHeaderValue] = React.useState(() => {
        const storedHeaderValue = localStorage.getItem('admin');
        console.log("Stored : ", storedHeaderValue);
        return storedHeaderValue || 'users';
    });

    React.useEffect(() => {
        localStorage.setItem('admin', headerValue);
        console.log("Headervalue : ", headerValue);
    }, [headerValue]);

    const handleChange = (event, newHeaderValue) => {
        console.log("change : ", newHeaderValue);
        if (newHeaderValue === "signOut") {
            setHeaderValue('users');
            localStorage.setItem('admin', 'users');
            localStorage.removeItem('provider');
        } else {
            setHeaderValue(newHeaderValue);
        }
    };

    return (
        <div style={{ height: '35px' }}>
            {/* <React.Fragment> */}
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar style={{ backgroundColor: 'whitesmoke' }}>
                    <Toolbar>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <img src={logo} alt='Login' height='65px' style={{ borderRadius: 50 }} />
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <ToggleButtonGroup value={headerValue} exclusive onChange={handleChange} aria-label="Platform" sx={{ width: "100%", padding: 0 }}>

                                    <StyledToggleButton disableRipple disableTouchRipple disableFocusRipple value="users" onClick={() => navigate("/users")}>
                                        <PeopleAltIcon /> users
                                    </StyledToggleButton>

                                    <StyledToggleButton disableRipple disableTouchRipple disableFocusRipple value="roles" onClick={() => navigate("/roles")}>
                                        <TokenIcon /> roles
                                    </StyledToggleButton>

                                    <StyledToggleButton disableRipple disableTouchRipple disableFocusRipple value="signOut" onClick={() => navigate("/login")}>
                                        <ExitToAppOutlinedIcon />  Sign Out
                                    </StyledToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            {/* </React.Fragment> */}
        </div>
    );
}
