import Searchbar from "@/app/components/Searchbar";
import Sidebar from "@/app/components/Sidebar";

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
                  <div className="settings__wrapper">
                    <div className="section__title page__title">Settings</div>
                    <div className="setting__content">
                      '
                      <div className="settings__sub--title">
                        Your Subscription plan
                      </div>
                      <div className="settings__text">premium-plus</div>
                    </div>
                    <div className="setting__content">
                      <div className="settings__sub--title">Email</div>
                      <div className="settings__text">hanna@gmail.com</div>
                    </div>
                    <div
                      className="skeleton"
                      style={{
                        width: "160px",
                        height: "24px",
                        marginBottom: "12px",
                      }}
                    ></div>
                    <div
                      className="skeleton"
                      style={{
                        width: "280px",
                        height: "24px",
                        marginBottom: "32px",
                      }}
                    ></div>
                    <div
                      className="skeleton"
                      style={{
                        width: "160px",
                        height: "24px",
                        marginBottom: "12px",
                      }}
                    ></div>
                    <div
                      className="skeleton"
                      style={{ width: "280px", height: "24px" }}
                    ></div>
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
