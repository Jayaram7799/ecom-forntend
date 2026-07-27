import http from "k6/http";

export const options = {
  vus: 10000000,
  duration: "10s",
};

export default function () {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb2d1bGFyYW0yQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzc4OTE3MjYyLCJleHAiOjE3NzkwMDM2NjJ9.BWErupLYGFuyh8YpwnIvpMBSIuKiWrUGkAKzHmPhF7Y";

  const params = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  http.get("http://localhost:8080/api/products", params);
}
