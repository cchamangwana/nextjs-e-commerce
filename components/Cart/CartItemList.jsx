import { Header, Segment, Button, Icon, Item } from "semantic-ui-react";
import { useRouter } from "next/router";

function CartItemList({ products, user, handleRemoveFromCart }) {
  const router = useRouter();

  function mapcartProductsToItem(products) {
    return products.map((p) => ({
      childkey: p.product._id,
      header: (
        <Item.Header
          as="a"
          onClick={() => router.push(`/product?_id=${p.product._id}`)}
        >
          {p.product.name}
        </Item.Header>
      ),
      image: p.product.mediaUrl,
      meta: `${p.quantity} x $${p.product.price}`,
      fluid: "true",
      extra: (
        <Button
          basic
          icon="remove"
          floated="right"
          onClick={() => handleRemoveFromCart(p.product._id)}
        />
      ),
    }));
  }

  if (products.length === 0) {
    return (
      <Segment secondary color="teal" inverted textAlign="center">
        <Header>
          <Icon name="shopping basket" />
          No products in your cart. Add some!
        </Header>

        <div>
          {user ? (
            <Button color="orange" onClick={() => router.push("/")}>
              View Products
            </Button>
          ) : (
            <Button color="blue" onClick={() => router.push("/login")}>
              Login to Add Products
            </Button>
          )}
        </div>
      </Segment>
    );
  }
  return <Item.Group divided items={mapcartProductsToItem(products)} />;
}

export default CartItemList;
