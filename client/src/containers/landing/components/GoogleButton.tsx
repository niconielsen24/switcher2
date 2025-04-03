import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

interface GoogleButtonProps {
  onSucces: (response: CredentialResponse) => void;
  onError: () => void;
}

export function GoogleButton(props: GoogleButtonProps) {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        theme="filled_black"
        onSuccess={props.onSucces}
        onError={props.onError}
      />
    </GoogleOAuthProvider>
  );
}
