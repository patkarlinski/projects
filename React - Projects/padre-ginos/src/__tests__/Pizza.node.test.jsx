import { render, cleanup } from '@testing-library/react';
import { expect, test, afterEach } from 'vitest';
import Pizza from "../Pizza";

afterEach(cleanup);

// Define a test case with a description
test("alt test renders on Pizza image", async () => {
    // Define test data for the component
    const name = "My Favorite Pizza";
    // Random photo from Picsum API
    const src = "https://picsum.photos/200";

    // Render the Pizza component with props
    const screen = render(
        <Pizza name={name} description="super cool pizza" image={src} />
    );

    // Find the image element by its role
    const img = screen.getByRole("img");
    // Check if the image source is equal to the provided src
    expect(img.src).toBe(src);
    // Check if the alt text is equal to the provided name
    expect(img.alt).toBe(name);
});

test("to have default image if none is provided", async () => {
    //Render componente without src
    const screen = render (
       <Pizza name={"Cool Pizza"} description="super cool pizza" />,
    );
    //Check if im is empty, the component add default img
    const img = screen.getByRole("img");
    expect(img.src).not.toBe("");
});