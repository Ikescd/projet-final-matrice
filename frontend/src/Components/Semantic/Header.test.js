import Header from './Header'
import { render, screen, fireEvent } from '@testing-library/react'
import UserProvider from '../../Context/UserContext'


describe('Header', () => {
  test('Should render without crashing', async () => {
    render(
      <UserProvider>
        <Header />
      </UserProvider>
    )
  })

  test("It should retrieve the good url for a button", async () => {
    render(<UserProvider>
      <Header />
    </UserProvider>)
    const url = screen.getByText("INSCRIPTION").href;

    expect(url).toEqual("http://localhost/signup")
  })

  test("It should click the button", async () => {
    render(<UserProvider>
      <Header />
    </UserProvider>)

    const button = screen.getByText("INSCRIPTION");
    const isClicked = fireEvent.click(button)

    expect(isClicked).toEqual(true)
  })
})