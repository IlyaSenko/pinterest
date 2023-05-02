import { useState } from "react";
import PhotoModal from "./components/PhotoModal";
import PhotosList from "./components/PhotosList";

function App() {
  const [openedImgId, setOpenedImgId] = useState<null | string>(null);

  return (
    <>
      <PhotosList setOpenedImgId={setOpenedImgId} />
      {openedImgId && (
        <PhotoModal openedImgId={openedImgId} setOpenedImgId={setOpenedImgId} />
      )}
    </>
  );
}

export default App;
