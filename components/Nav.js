import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';

const Nav = () => {
  return (

    <User>
      {({data: {me}}) => (
        <NavStyles>
          <Link href="/items">
            <a>Shop</a>
          </Link>
          {me && (
            // react fragment
            <>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Link href="/me">
                <a>Account</a>
              </Link>
            </>
            // end react fragment
          )}
          {!me && (
            <Link href="/signup">
              <a>Sign In</a>
            </Link>
          )}

        </NavStyles>
      )}
    </User>

  );
};

export default Nav;
