import { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

type AddCommentProps = {
  open: boolean
  onCancel(): any
  onApply(comment: string): void
  currentComment: string
}
const AddComment = ({ open, onCancel, onApply, currentComment }: AddCommentProps) => {
  const [comment, setComment] = useState('')

  useEffect(() => {
    setComment(currentComment || '')
  }, [currentComment])

  const handleClose = () => {
    onCancel()
  }

  const handleAddComment = () => {
    onApply(comment)
  }

  const handleCommentChange = (ev: any) => {
    setComment(ev?.target?.value || '')
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Dodaj Komentarz</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Komentarz będzie widoczny przy produkcie. Powinien zawierać informacje, których nie da się przekazać przy
          uzyciu dostępnych pól
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="comment"
          label="Komentarz"
          type="text"
          fullWidth
          variant="standard"
          inputProps={{
            maxLength: 128,
          }}
          value={comment}
          onChange={handleCommentChange}
          helperText={`${comment.length}/128 znaków`}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Zamknij</Button>
        <Button onClick={handleAddComment}>Potwierdź</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddComment
