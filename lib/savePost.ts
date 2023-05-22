const LS_POSTS_KEY = "saved_posts";

export function managePost(postId: number) {
  // get current saved posts from LS, fallback to empty array if LS key doesn't exist
  const currentSavedPosts = JSON.parse(
    localStorage.getItem("saved_posts") ?? "[]"
  ) as number[];

  // if the postId exists in the saved posts array
  if (currentSavedPosts.includes(postId)) {
    // filter it out of the current saved posts, to get back an array with all other postIds except this one
    const newSavedPosts = currentSavedPosts.filter(
      (savedPostId) => savedPostId !== postId
    );
    // update LS with the new array
    localStorage.setItem(LS_POSTS_KEY, JSON.stringify(newSavedPosts));
    return "deleted";
  } else {
    // if the post isn't in the current saved posts, create a new array with the existing posts and the new postId
    const newSavedPosts = [...[postId], ...currentSavedPosts];
    // update LS with the new array
    localStorage.setItem(LS_POSTS_KEY, JSON.stringify(newSavedPosts));
    return "saved";
  }
}

export function isPostSaved(postId: number) {
  // get current saved posts from LS, fallback to empty array if LS key doesn't exist
  const currentSavedPosts = JSON.parse(
    localStorage.getItem("saved_posts") ?? "[]"
  );

  // return true if the posts exists in LS
  return currentSavedPosts.includes(postId) ? true : false;
}
