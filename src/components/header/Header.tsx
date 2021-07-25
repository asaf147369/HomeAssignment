import Nav from './Nav';
import { Container } from '../common/container/Container';
import { Title } from '../common/text/Title';
import Styles from './header.module.scss';


const Header = () => {
  return (
    <Container
      justify="flex-start"
      alignItems="center"
      padding="0 25px"
      margin="0 0 30px 0px"
      wrap="wrap"
      backgroundColor="#f2f2f2"
      className={Styles.headerWrapper}
    >
      <Title level="1" margin="0 20px 0 0">
        BeerBuddy
      </Title>
        <Nav />
    </Container>
  );
};

export default Header;