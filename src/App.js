import "./app.css";
import logo from "./send.io.svg";
import { useState, useEffect } from "react";
import ProductsList from "./products-list.json";
import {
    Link,
    Routes,
    Route,
    Outlet,
    useParams,
    useLocation,
    useNavigate,
} from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";

function App() {
    const menuItems = ["tokens", "about", "contact"];

    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        fetch("https://api.coingecko.com/api/v3/search/trending")
            .then((response) => response.json())
            .then((data) => {
                setTokens(data.coins);
            });
    }, []);

    function Tokens() {
        const location = useLocation();

        return (
            <>
                <div className="wrap section">
                    <div className="tokens grid grid-3">
                        {tokens
                            .filter((item) => item.item.name.includes(""))
                            .map((filteredItem, index) => (
                                <div className="token col" key={index}>
                                    <Link
                                        className="token__img-link"
                                        to={
                                            location.pathname === "/tokens"
                                                ? `/tokens/token/${filteredItem.item.id}`
                                                : `/launches/launch/${filteredItem.item.id}`
                                        }
                                    >
                                        <div className="token__img-wrap">
                                            <img
                                                className="token__img"
                                                src={`${filteredItem.item.large}`}
                                                alt={filteredItem.item.name}
                                            />
                                        </div>
                                    </Link>
                                    <div className="token__content">
                                        <div className="token__heading-wrap">
                                            <h4 className="token__heading">
                                                {
                                                    <Link
                                                        className="token__heading-link"
                                                        to={
                                                            location.pathname ===
                                                            "/tokens"
                                                                ? `/tokens/token/${filteredItem.item.id}`
                                                                : `/launches/launch/${filteredItem.item.id}`
                                                        }
                                                    >
                                                        {filteredItem.item.name}
                                                    </Link>
                                                }
                                            </h4>
                                            <Link
                                                className="token__heading-icon"
                                                to={
                                                    location.pathname ===
                                                    "/tokens"
                                                        ? `/tokens/token/${filteredItem.item.id}`
                                                        : `/launches/launch/${filteredItem.item.id}`
                                                }
                                            >
                                                <ArrowForwardIcon />
                                            </Link>
                                        </div>
                                        <p className="token__meta">
                                            {filteredItem.item.launchDate} at{" "}
                                            {filteredItem.item.launchTime}
                                        </p>
                                        <div className="token__links">
                                            <a
                                                className="token__link"
                                                target="_blank"
                                                href="https://clifftoken.io/"
                                                rel="noreferrer"
                                            >
                                                <LanguageIcon />
                                            </a>
                                            <a
                                                className="token__link"
                                                target="_blank"
                                                href="https://twitter.com/clifftoken"
                                                rel="noreferrer"
                                            >
                                                <TwitterIcon />
                                            </a>
                                            <a
                                                className="token__link"
                                                target="_blank"
                                                href="https://t.me/cliffordinuofficial"
                                                rel="noreferrer"
                                            >
                                                <TelegramIcon />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </>
        );
    }

    function Launches() {
        return (
            <>
                <Tokens />
            </>
        );
    }

    function Token() {
        const { tokenId } = useParams();

        const [token, setToken] = useState([]);

        useEffect(() => {
            fetch(
                `https://api.coingecko.com/api/v3/coins/${tokenId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`
            )
                .then((response) => response.json())
                .then((data) => {
                    setToken(data);
                });
        }, [tokenId]);

        return (
            <>
                <div className="wrap section grid grid-2">
                    <div className="token token--single col">
                        <div className="token__img-wrap">
                            <img
                                className="token__img"
                                src={token.image?.large}
                                alt={token.name}
                            />
                        </div>
                        <div className="token__content">
                            <div className="token__heading-wrap">
                                <h4 className="token__heading">{token.name}</h4>
                            </div>
                            <p className="token__meta">
                                <span>
                                    Price:
                                    {token.market_data?.current_price.usd}
                                </span>
                            </p>
                            <p
                                className="token__intro"
                                style={{ whiteSpace: "pre-line" }}
                            >
                                {token.description?.en}
                            </p>
                            <div className="token__links">
                                <a
                                    className="token__link"
                                    target="_blank"
                                    href="https://clifftoken.io/"
                                    rel="noreferrer"
                                >
                                    <LanguageIcon />
                                </a>
                                <a
                                    className="token__link"
                                    target="_blank"
                                    href="https://twitter.com/clifftoken"
                                    rel="noreferrer"
                                >
                                    <TwitterIcon />
                                </a>
                                <a
                                    className="token__link"
                                    target="_blank"
                                    href="https://t.me/cliffordinuofficial"
                                    rel="noreferrer"
                                >
                                    <TelegramIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    function Launch() {
        const { tokenId } = useParams();

        return (
            <>
                <div className="wrap section">
                    <div className="tokens grid grid-3">
                        {tokens
                            .filter((item) => item.id === tokenId)
                            .map((filteredItem, index) => (
                                <div
                                    className="token token--single col"
                                    key={index}
                                >
                                    <div className="token__img-wrap">
                                        <img
                                            className="token__img"
                                            src={`/${filteredItem.logo}`}
                                            alt={filteredItem.name}
                                        />
                                    </div>
                                    <div className="token__content">
                                        <div className="token__heading-wrap">
                                            <h4 className="token__heading">
                                                {filteredItem.name}
                                            </h4>
                                        </div>
                                        <p className="token__meta">
                                            {filteredItem.launchDate} at{" "}
                                            {filteredItem.launchTime}
                                        </p>
                                        <p className="token__intro">
                                            {filteredItem.description}
                                        </p>
                                        <div className="token__links">
                                            <a
                                                className="token__link"
                                                target="_blank"
                                                href="https://clifftoken.io/"
                                                rel="noreferrer"
                                            >
                                                <LanguageIcon />
                                            </a>
                                            <a
                                                className="token__link"
                                                target="_blank"
                                                href="https://twitter.com/clifftoken"
                                                rel="noreferrer"
                                            >
                                                <TwitterIcon />
                                            </a>
                                            <a
                                                className="token__link"
                                                target="_blank"
                                                href="https://t.me/cliffordinuofficial"
                                                rel="noreferrer"
                                            >
                                                <TelegramIcon />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </>
        );
    }

    function TokensRoute() {
        return (
            <>
                <FilterCheckbox />
                <Outlet />
            </>
        );
    }

    function LaunchesRoute() {
        return (
            <>
                <Outlet />
            </>
        );
    }

    function About() {
        return (
            <>
                <div className="wrap wrap--no-cols section">
                    <h2>About</h2>
                </div>
            </>
        );
    }

    function Contact() {
        return (
            <>
                <div className="wrap wrap--no-cols section">
                    <h2>Contact</h2>
                </div>
            </>
        );
    }

    function NoMatch() {
        return (
            <>
                <div className="wrap wrap--no-cols section">
                    <h2>Page not found</h2>
                    <Link to="/">Go to the home page</Link>
                </div>
            </>
        );
    }

    function Search() {
        const navigate = useNavigate();

        const handleSubmit = (event) => {
            let data = new FormData(event.target);
            let urlEncoded = new URLSearchParams(data);

            navigate(`/search/${urlEncoded}`, {
                state: { searchTerm: `${urlEncoded}` },
            });

            event.target.reset();
        };

        return (
            <>
                <form
                    className="form form--search"
                    onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit(event);
                    }}
                >
                    <input type="text" name="s" placeholder="search" />
                    <button type="submit" value="Submit">
                        <SearchIcon />
                    </button>
                </form>
            </>
        );
    }

    function SearchRoute() {
        const location = useLocation();

        let { s } = useParams();
        s = s.replace(/['s'=]/g, "").replace(/['+']/g, " ");

        return (
            <div className="wrap section">
                <div className="tokens grid grid-3">
                    {tokens
                        .filter((post) => {
                            if (s === "") {
                                return post;
                            } else if (
                                post.name
                                    .toLowerCase()
                                    .includes(s.toLowerCase())
                            ) {
                                return post;
                            }
                            return null;
                        })
                        .map((post, index) => (
                            <div className="token col" key={index}>
                                <Link
                                    className="token__img-link"
                                    to={
                                        location.pathname === "/tokens"
                                            ? `/tokens/token/${post.id}`
                                            : `/launches/launch/${post.id}`
                                    }
                                >
                                    <div className="token__img-wrap">
                                        <img
                                            className="token__img"
                                            src={`/${post.logo}`}
                                            alt={post.name}
                                        />
                                    </div>
                                </Link>
                                <div className="token__content">
                                    <div className="token__heading-wrap">
                                        <h4 className="token__heading">
                                            {
                                                <Link
                                                    className="token__heading-link"
                                                    to={
                                                        location.pathname ===
                                                        "/tokens"
                                                            ? `/tokens/token/${post.id}`
                                                            : `/launches/launch/${post.id}`
                                                    }
                                                >
                                                    {post.name}
                                                </Link>
                                            }
                                        </h4>
                                        <Link
                                            className="token__heading-icon"
                                            to={
                                                location.pathname === "/tokens"
                                                    ? `/tokens/token/${post.id}`
                                                    : `/launches/launch/${post.id}`
                                            }
                                        >
                                            <ArrowForwardIcon />
                                        </Link>
                                    </div>
                                    <p className="token__meta">
                                        {post.launchDate} at {post.launchTime}
                                    </p>
                                    <p className="token__intro">{post.intro}</p>
                                    <div className="token__links">
                                        <a
                                            className="token__link"
                                            target="_blank"
                                            href="https://clifftoken.io/"
                                            rel="noreferrer"
                                        >
                                            <LanguageIcon />
                                        </a>
                                        <a
                                            className="token__link"
                                            target="_blank"
                                            href="https://twitter.com/clifftoken"
                                            rel="noreferrer"
                                        >
                                            <TwitterIcon />
                                        </a>
                                        <a
                                            className="token__link"
                                            target="_blank"
                                            href="https://t.me/cliffordinuofficial"
                                            rel="noreferrer"
                                        >
                                            <TelegramIcon />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    }

    function Checkbox(id, name, handleChange, checked, title) {
        return (
            <div>
                <input
                    id={id}
                    type="checkbox"
                    name={name}
                    onChange={handleChange}
                    checked={checked}
                />
                <label htmlFor={id}>{title}</label>
            </div>
        );
    }

    const Product = ({ title, category }) => {
        return (
            <article>
                <h3>{title}</h3>
                <p>{category}</p>
            </article>
        );
    };

    const ProductList = (props) => {
        const { products } = props;

        const renderProducts = products.map(({ id, title, category }) => {
            return (
                <li key={id}>
                    <Product title={title} category={category} />
                </li>
            );
        });

        return <ul>{renderProducts}</ul>;
    };

    function FilterCheckbox() {
        const [products, setProducts] = useState(ProductsList.productsList);
        const [categories] = useState({
            first: false,
            second: false,
        });

        const checkedProducts = Object.entries(categories)
            .filter((category) => category[1])
            .map((category) => category[0]);

        const filteredProducts = products.filter(({ category }) =>
            checkedProducts.includes(category)
        );

        function handleChange(e) {
            const { name } = e.target;
            console.log(name);

            setProducts((prevState) => {
                return {
                    categories: {
                        ...prevState.categories,
                        [name]: !prevState.categories[name],
                    },
                };
            });
        }

        return (
            <>
                <h1>Hello CodeSandbox</h1>
                <h2>Start editing to see some magic happen!</h2>
                <Checkbox
                    id="1"
                    title="show first category products"
                    name="first"
                    checked={categories.first}
                    handleChange={handleChange}
                />
                <Checkbox
                    id="2"
                    title="show second category products"
                    name="second"
                    handleChange={handleChange}
                    checked={categories.second}
                />
                <ProductList
                    products={
                        filteredProducts.length === 0
                            ? products
                            : filteredProducts
                    }
                />
            </>
        );
    }

    function GlobalNav() {
        return (
            <header className="app-header">
                <div className="wrap wrap--no-cols">
                    <Link to="/" className="app-logo">
                        <img src={logo} className="app-logo" alt="logo" />
                    </Link>
                    <AppMenu menuItems={menuItems} />
                    <Search />
                </div>
            </header>
        );
    }

    function AppMenu(props) {
        const menuItems = props.menuItems;

        const appMenu = menuItems.map((item, index) => (
            <li key={index}>
                <Link to={`/${item}`}>{item}</Link>
            </li>
        ));

        return (
            <>
                <nav className="app-menu">
                    <li key="launches">
                        <Link to={"/"}>Launches</Link>
                    </li>
                    {appMenu}
                </nav>
            </>
        );
    }

    function Layout() {
        return (
            <>
                <GlobalNav />
                <BackButton />
                <Outlet />
            </>
        );
    }

    function BackButton() {
        const navigate = useNavigate();

        return (
            <>
                <div className="wrap wrap--no-cols section">
                    <button className="button" onClick={() => navigate(-1)}>
                        <ArrowBackIcon />
                    </button>
                </div>
            </>
        );
    }

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<LaunchesRoute />}>
                        <Route index element={<Launches />} />
                        <Route
                            path="launches/launch/:tokenId"
                            element={<Launch />}
                        />
                    </Route>
                    <Route path="tokens" element={<TokensRoute />}>
                        <Route index element={<Tokens />} />
                        <Route path="token/:tokenId" element={<Token />} />
                    </Route>
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="search" element={<SearchRoute />}>
                        <Route path=":s" element={<SearchRoute />} />
                    </Route>
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
