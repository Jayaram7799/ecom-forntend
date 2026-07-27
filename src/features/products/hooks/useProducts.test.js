import { renderHook, waitFor } from "@testing-library/react";

import { describe, test, expect, vi } from "vitest";

import useProducts from "./useProducts";

import apiClient from "../../../services/apiClient";

vi.mock("../../../services/apiClient");

describe("useProducts", () => {
  test("fetches products", async () => {
    apiClient.get.mockResolvedValue({
      data: {
        data: {
          content: [
            {
              id: 1,
              name: "Lipstick",
            },
          ],
          totalPages: 2,
        },
      },
    });

    const { result } = renderHook(() => useProducts({}));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toHaveLength(1);
  });
});
