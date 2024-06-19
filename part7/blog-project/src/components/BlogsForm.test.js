import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogsForm from "./BlogsForm";
import Blog from "./Blog";

jest.setTimeout(70000);

describe("<Blogs />", () => {
  let container;

  const author = "Test Author";
  const title = "Test entry";
  const url = "/test.html";

  const blog = {
    author: author,
    title: title,
    url: url,
    user: {
      name: "Test User",
      username: "test_user",
    },
  };

  const username = {
    username: "test_user",
  };

  const user = userEvent.setup();
  const mockHandler = jest.fn();

  beforeEach(async () => {
    container = render(
      <Blog blog={blog} user={username} handleEditBlog={mockHandler} />,
    ).container;
  });

  test("5.13. Untoggled <Blogs> renders the title and the author by default", () => {
    const div = container.querySelector(".infoBlock");
    expect(div).toHaveStyle("display: none");
  });

  test("5.14. Toggled <Blogs> renders a URL and a number of likes", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".infoBlock");
    expect(div).not.toHaveStyle("display: none");
  });

  test("5.15. Click like twice – called twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test("5.16. Check the blog creation", async () => {
    const createBlog = jest.fn();

    render(<BlogsForm createBlog={createBlog} />);

    const inputTitle = screen.getByPlaceholderText("Enter the title");
    const inputAuthor = screen.getByPlaceholderText("Enter the author name");
    const inputUrl = screen.getByPlaceholderText("Enter the URL");
    const submitBtn = screen.getByText("add");

    await user.type(inputTitle, title);
    await user.type(inputAuthor, author);
    await user.type(inputUrl, url);
    await user.click(submitBtn);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toBe(title);
    expect(createBlog.mock.calls[0][1]).toBe(author);
    expect(createBlog.mock.calls[0][2]).toBe(url);
  });
});
