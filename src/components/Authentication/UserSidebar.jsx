import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { CryptoState } from "../../CryptoContext";
import { Avatar, Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../Banner/Carousel";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

export default function UserSidebar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        {
          merge: "true",
        }
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed from the watchlist !`,
        type: 'success',
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      })
    }
  };

  const logOut = () => {
    signOut(auth);

    setAlert({
      open: true,
      type: "success",
      message: "Logout Successful !",
    });

    toggleDrawer();
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              cursor: "pointer",
              backgroundColor: "#347C2C",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="sidebar-container">
              <div className="sidebar-profile">
                <Avatar
                  className="sidebar-picture"
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className="sidebar-watchlist">
                  <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>

                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div className="watchlist-coin">
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(3))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                  })}
                </div>
              </div>
              <Button
                variant="contained"
                className="sidebar-logout"
                onClick={logOut}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
