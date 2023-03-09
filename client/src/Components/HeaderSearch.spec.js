import { render, fireEvent, waitFor } from "@testing-library/react";
import { within } from "@testing-library/dom";
import "@testing-library/jest-dom";
import HeaderSearch from "./HeaderSearch";

beforeEach(() => {
    const mockBreedsResponse = [
        { id: 'abys', label: 'Abyssinian' },
        { id: 'aege', label: 'Aegean' },
    ];
    const mockCatsImages = [];
    jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue(mockBreedsResponse)
        })
        .mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue(mockCatsImages)
        })
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('renders header search bar with list of breeds when click call api to retrieve all images', async () => {
    const { getByTestId, getByText } = render(<HeaderSearch />);

    await waitFor(() => expect(getByTestId('autocomplete-cats-breeds')).toBeInTheDocument());

    const autocomplete = getByTestId('autocomplete-cats-breeds');
    const input = within(autocomplete).getByRole('combobox');
    autocomplete.focus();
    fireEvent.change(input, { target: { value: 'abys' } });
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(autocomplete, { key: 'Enter' });
    await waitFor( () => expect(getByText('Abyssinian')).toBeInTheDocument());
})