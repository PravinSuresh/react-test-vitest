// import { SimplePost } from "./components/1Simple/SimplePost";
// import UseArrayExample from "./components/2hooks/UseArrayExample";
// import { PostWithComment } from "./components/3UserInteraction/PostWithComments";
// import { ShoppingList1 } from "./components/4Errors/ShoppingList1";
import { Post } from "./components/7Axios/Post";
// import { ShoppingList2 } from "./components/4Errors/ShoppingList2";
function App() {
  return (
    <>
      {/* <SimplePost
        user='Pravin'
        content='Is learning something'
        likesBy={["Suresh", "Nantha", "Nalanda"]}
      /> */}
      {/* <PostWithComment
        content='hello'
        user='Pravin'
      /> */}
      {/* <ShoppingList1
        groceries={["apple", "orange", "apple"]}
        selectItem={(e: { text: string; checked: boolean }) => {
          console.log(e);
        }}
      /> */}
      {/* <ShoppingList2
        groceries={["apple", "orange", "apple"]}
        selectItem={(e: { text: string; checked: boolean }) => {
          console.log(e);
        }}
      /> */}
      <Post
        content='axios post'
        user='Pravin'
        id='0655'
      />
    </>
  );
}

export default App;
