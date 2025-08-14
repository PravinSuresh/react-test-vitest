// import { SimplePost } from "./components/1Simple/SimplePost";
// import UseArrayExample from "./components/2hooks/UseArrayExample";
import { PostWithComment } from "./components/3UserInteraction/PostWithComments";
function App() {
  return (
    <>
      {/* <SimplePost
        user='Pravin'
        content='Is learning something'
        likesBy={["Suresh", "Nantha", "Nalanda"]}
      /> */}
      <PostWithComment
        content='hello'
        user='Pravin'
      />
    </>
  );
}

export default App;
