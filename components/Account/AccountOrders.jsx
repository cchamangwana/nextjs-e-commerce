import { Header, Accordion, Label, Segment, Icon, Button, list, Image } from 'semantic-ui-react';
import { useRouter } from 'next/router';

function AccountOrders({ orders }) {
  const router = useRouter()

  function mapOrdersToPanels(orders){
    return orders.map(order => ({
      key: order._id,
      title: {
        content: <Label color ="blue" content={order.createdAt}/>
      },
      content: (
        <>
          <List.Header as="h3">
            Total: ${order.total}
            <Label
              content={order.email}
              icon="mail"
              basic
              holizantal
              style={{ marginLeft: '1em' }}
            />
          </List.Header>
        </>
      )
    }))
  }
  return <>
    <header as="h2">
      <Icon name="folder open"/>
        Orders History
    </header>
    {orders.length === 0 ? (
      <Segment inverted tertiary color="grey" textAlign="center">
        <Header icon>
          <Icon name="copy outline"/>
            No past orders.
        </Header>
        <div>
          <Button onClick={()=> router.push('/')} color="orange">
            View Produts
          </Button>
        </div>
      </Segment>
    ): (
      <Accordion
        fluid
        styled
        exclusive={false}
        panels={mapOrdersToPanels(orders)}
      />
    )}


  </>;
}

export default AccountOrders;
