import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CatsImages from "./CatsImages";

test('renders cat breed with images', async () => {
    const breed = 'Bengal';
    const cats = [
        {
            id: 'J2PmlIizw',
            image: 'https://cdn2.thecatapi.com/images/J2PmlIizw.jpg',
        },
        {
            id: 'LSaDk6OjY',
            image: 'https://cdn2.thecatapi.com/images/LSaDk6OjY.jpg',
        },
    ];
    const { getByText, getByTestId } = render(<CatsImages breed={breed} cats={cats} />);

    expect(getByText('Bengal')).toBeInTheDocument();
    expect(getByTestId('J2PmlIizw').src).toEqual('https://cdn2.thecatapi.com/images/J2PmlIizw.jpg?w=164&h=164&fit=crop&auto=format');
    expect(getByTestId('LSaDk6OjY').src).toEqual('https://cdn2.thecatapi.com/images/LSaDk6OjY.jpg?w=164&h=164&fit=crop&auto=format');
})