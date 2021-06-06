import Avatar from "@material-ui/core/Avatar";
import Camera from "@material-ui/icons/CameraAlt";
import Delete from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import InputBase from "@material-ui/core/InputBase";
import Page from "material-ui-shell/lib/containers/Page/Page";
import Paper from "@material-ui/core/Paper";
import PersonIcon from "@material-ui/icons/Person";
import React, { useState } from "react";
import Save from "@material-ui/icons/Save";
import Zoom from "@material-ui/core/Zoom";
import { useAuth } from "base-shell/lib/providers/Auth";
import { useQuestions } from "material-ui-shell/lib/providers/Dialogs/Question";
import ImgageUploadDialog from "material-ui-shell/lib/containers/ImageUploadDialog";
import CenteredContainer from "components/Container/CenteredContainer";
import { connect } from "react-redux";

const MyAccount = ({ submitUserToGlobalState }) => {
  const { openDialog } = useQuestions();

  const { auth, updateAuth, setAuth } = useAuth();

  const {
    photoURL: currentPhoroURL = "",
    displayName: currentDisplayName = "",
    email: currentEmail = "",
    phone: currentPhone = "",
  } = auth || {};

  const [displayName, setDisplayName] = useState(currentDisplayName);
  const [photoURL, setPhotoURL] = useState(currentPhoroURL);
  const [email, setEmail] = useState(currentEmail);
  const [phone, setPhone] = useState(currentPhone);
  const [isImageDialogOpen, setImageDialogOpen] = useState(false);

  const hasChange =
    displayName !== currentDisplayName ||
    photoURL !== currentPhoroURL ||
    email !== currentEmail ||
    phone !== currentPhone;

  const handleImageChange = (image) => {
    setPhotoURL(image);
  };

  const handleSave = async () => {
    const updatedUser = { displayName, email, phone };
    updateAuth({ ...auth, ...updatedUser, photoURL });
    submitUserToGlobalState({ ...updatedUser });
  };

  const openDeleteDialog = () => {
    openDialog({
      title: "Delete Account?",
      message:
        "This Account and all related data to it will be deleted permanently. Do you want to proceed with the deletion?",
      action: "DELETE ACCOUNT",

      handleAction: handleDelete,
    });
  };

  const handleDelete = async (handleClose) => {
    setAuth({ isAuthenticated: false });
    handleClose();
  };

  return (
    <Page pageTitle="My Account">
      <CenteredContainer>
        <Paper
          elevation={3}
          style={{
            maxWidth: "90vw",
            position: "relative",
            borderRadius: 18,
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Fab
            size="medium"
            style={{ position: "absolute", bottom: -16, right: -16 }}
            onClick={openDeleteDialog}
            color="secondary"
            aria-label="delete"
          >
            <Delete />
          </Fab>

          <Fab
            onClick={() => setImageDialogOpen(true)}
            style={{
              position: "absolute",
              zIndex: 99,
              top: 50,
              marginRight: -60,
            }}
            color="primary"
            aria-label="save"
            size="small"
          >
            <Camera />
          </Fab>

          {photoURL && (
            <Avatar
              style={{ width: 120, height: 120, marginTop: -40 }}
              alt="User Picture"
              src={photoURL}
            />
          )}
          {!photoURL && (
            <Avatar
              style={{ width: 120, height: 120, marginTop: -40 }}
              alt="User Picture"
            >
              {displayName ? (
                <strong style={{ fontSize: 80 }}>
                  {displayName[0].toUpperCase()}
                </strong>
              ) : (
                <PersonIcon />
              )}
            </Avatar>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: 18,
              marginBottom: 18,
            }}
          >
            <InputBase
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              inputProps={{
                "aria-label": "naked",
                style: {
                  fontSize: 26,
                  fontWeight: "bold",
                  textAlign: "center",
                },
              }}
            />
            <InputBase
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{
                "aria-label": "naked",
                style: {
                  fontSize: 20,

                  textAlign: "center",
                },
              }}
            />
            <InputBase
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputProps={{
                "aria-label": "naked",
                style: {
                  fontSize: 20,

                  textAlign: "center",
                },
              }}
            />
          </div>

          <Zoom in={hasChange}>
            <Fab
              onClick={handleSave}
              style={{ marginBottom: -20 }}
              color="primary"
              aria-label="save"
            >
              <Save />
            </Fab>
          </Zoom>
        </Paper>
        {
          <ImgageUploadDialog
            isOpen={isImageDialogOpen}
            handleClose={() => setImageDialogOpen(false)}
            handleCropSubmit={handleImageChange}
          />
        }
      </CenteredContainer>
    </Page>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    submitUserToGlobalState: (payload) =>
      dispatch({
        type: "UPDATE_USER",
        payload,
      }),
  };
}

export default connect(null, mapDispatchToProps)(MyAccount);
