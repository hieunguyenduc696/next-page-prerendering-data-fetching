function userProfile(props) {
  return <h1>{props.username}</h1>;
}

export async function getServerSideProps() {
  return {
    props: {
      username: "Max",
    },
  };
}

export default userProfile;
