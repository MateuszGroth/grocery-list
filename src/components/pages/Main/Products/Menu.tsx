import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import AddCommentIcon from '@mui/icons-material/AddComment'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import ListItemText from '@mui/material/ListItemText'

import { PRODUCT_ACTION } from 'constant'

type MenuProps = {
  anchorEl: any
  open: boolean
  onClose(arg?: any): any
  hasSelected?: boolean
}
export const ProductMenu = ({ anchorEl, open, onClose }: MenuProps) => {
  return (
    <Menu
      id="product-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={() => onClose()}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={() => onClose(PRODUCT_ACTION.EDIT)}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edytuj</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => onClose(PRODUCT_ACTION.COMMENT)}>
        <ListItemIcon>
          <AddCommentIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Skomentuj</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => onClose(PRODUCT_ACTION.DELETE)}>
        <ListItemIcon>
          <DeleteIcon sx={{ color: 'coral' }} fontSize="small" />
        </ListItemIcon>
        <ListItemText sx={{ color: 'coral' }}>Usuń</ListItemText>
      </MenuItem>
    </Menu>
  )
}

export const AllMenu = ({ anchorEl, open, onClose, hasSelected }: MenuProps) => {
  return (
    <Menu
      id="product-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={() => onClose()}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {hasSelected && (
        <MenuItem onClick={() => onClose(PRODUCT_ACTION.DELETE_SELECTED)}>
          <ListItemIcon>
            <DeleteSweepIcon sx={{ color: 'coral' }} fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'coral' }}>Usuń Zaznaczone</ListItemText>
        </MenuItem>
      )}
      <MenuItem onClick={() => onClose(PRODUCT_ACTION.DELETE_ALL)}>
        <ListItemIcon>
          <DeleteForeverIcon sx={{ color: 'coral' }} fontSize="small" />
        </ListItemIcon>
        <ListItemText sx={{ color: 'coral' }}>Usuń Wszystkie</ListItemText>
      </MenuItem>
    </Menu>
  )
}
