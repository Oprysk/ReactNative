import React from 'react'
import { Container, Header, Item, Content, Footer, FooterTab, Button, Left, Input, Icon, Text } from 'native-base'

export const MainLayout = () => (
  <Container>
    <Header searchBar rounded>
      <Left>
        <Button transparent>
          <Icon name="menu" />
        </Button>
      </Left>
      <Item style={{ flex: 2 }}>
        <Icon name="ios-search" />
        <Input placeholder="Search" />
        <Icon name="ios-people" />
      </Item>
      <Button transparent>
        <Text>Search</Text>
      </Button>
    </Header>
    <Content>
      <Text>This is Content Section</Text>
    </Content>
    <Footer>
      <FooterTab>
        <Button full>
          <Text>Footer</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>
)
