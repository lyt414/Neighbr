import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ProfileButton(props) {
  const { handleClick } = props;
  return (
    <Button
      color="primary"
      variant="contained"
      startIcon={<AccountCircleIcon />}
      onClick={handleClick}
      // sx={{
      //   boxSizing: 'unset',
      //   width: '130px',
      //   height: '18px',
      //   padding: '2px',
      //   borderRadius: '8px'
      // }}
    >
      View Profile
    </Button>
  );
}

ProfileButton.propTypes = {
  handleClick: PropTypes.func.isRequired
};