import { expect, test } from "@playwright/test";

test("vision training book supports safe mode, mode switching, and session logging", async ({ page }) => {
  await page.goto("/vision-training");

  await expect(page.getByRole("heading", { name: /조절력을 키우는 것입니다/ })).toBeVisible();
  await expect(page.getByText("진단이나 치료 처방이 아닙니다")).toBeVisible();

  await page.getByRole("button", { name: "안전 모드로 시작" }).click();
  await expect(page.locator(".vision-stage.running")).toBeVisible();

  await page.getByRole("button", { name: /근거리-원거리 점프/ }).click();
  await expect(page.getByRole("heading", { name: "근거리-원거리 점프" })).toBeVisible();

  await page.getByRole("button", { name: "오늘 기록 저장" }).click();
  await expect(page.getByText(/초 · 피로/)).toBeVisible();
});
