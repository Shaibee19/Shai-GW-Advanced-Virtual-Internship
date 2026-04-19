import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import Selected from "../components/Selected";
import Recommended from "../components/Recommended";
import Suggested from "../components/Suggested";

const Page = () => {
  return (
    <>
      <div id="__next">
        <div className="wrapper">
          <div className="page__layout">
            <Sidebar />

            <div className="page__content">
              <Searchbar />

              <div className="row">
                <div className="container">
                  <div className="for-you__wrapper">
                    <Selected />
                    <Recommended />
                    <Suggested />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
