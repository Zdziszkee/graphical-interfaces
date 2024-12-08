import { Typography } from '@mui/material';
import Logo from './Logo';

const WelcomeBanner = () => {
	return (<>
		<Typography variant={"h4"} sx={{fontWeight: 500, mb: 1}}>Welcome to</Typography>
		<Logo />
	</>)
}

export default WelcomeBanner;