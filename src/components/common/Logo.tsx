import { Typography } from '@mui/material';

const Logo = () => {
	return (<>
		<Typography variant={"h5"} sx={{color: "secondary.main"}}>
			My
			<Typography variant={"h4"} sx={{color: "primary.main"}} component={"span"}>
				food
			</Typography>
		</Typography>
	</>)
};

export default Logo;