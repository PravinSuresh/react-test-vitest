import { SimplePost } from "./components/1Simple/SimplePost";
function App() {
  return (
    <>
      <SimplePost
        user='Pravin'
        content='Is learning something'
        likesBy={["Suresh", "Nantha", "Nalanda"]}
      />
    </>
  );
}

export default App;
