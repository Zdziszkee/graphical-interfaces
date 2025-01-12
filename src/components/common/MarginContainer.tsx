import { Box } from "@mui/material"
import React from 'react';

const MarginContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<Box sx={{mx: { xs: 0, sm: 3, md: 5 }}}>
			{children}
		</Box>
	)
}

export default MarginContainer;
