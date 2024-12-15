import { ListItemAvatar, ListItemButton, Avatar, ListItem, Box, ListItemText } from '@mui/material';

const RecipeListItem = ({ key, onClick, name, image }: {key: number, onClick: () => void, name: string, image: string}) => {
	return (
		<ListItem key={key}>
		<ListItemButton onClick={onClick}>
			<ListItemAvatar>
				<Avatar>
					<Box component="img" src={image} sx={{maxWidth: '100%', maxHeight: '100%'}} />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={name} />
		</ListItemButton>
		</ListItem>
	);
}

export default RecipeListItem;