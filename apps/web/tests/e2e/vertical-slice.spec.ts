import { expect, test } from "@playwright/test";

test("learner can complete the ratio gas-flow vertical slice", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /단위와 비율/ })).toBeVisible();

  await page.getByRole("button", { name: "진단", exact: true }).click();
  await page.getByRole("button", { name: "1%", exact: true }).click();
  await page.getByRole("button", { name: "20,000 sccm", exact: true }).click();
  await page.getByRole("button", { name: "100:1", exact: true }).click();
  await expect(page.getByText(/진단 완료/)).toBeVisible();

  await page.getByRole("button", { name: "수업", exact: true }).click();
  await page.getByRole("button", { name: /수업 완료/ }).click();
  await expect(page.getByText(/Current mastery/)).toBeVisible();

  await page.getByRole("button", { name: "실습", exact: true }).click();
  await page.getByLabel("submitted ratio").fill("100");
  await page.getByRole("button", { name: /제출하고 피드백/ }).click();
  await expect(page.getByText(/정답/)).toBeVisible();

  await page.getByRole("button", { name: "복습", exact: true }).click();
  await expect(page.getByText(/epi-gas-ratio/).first()).toBeVisible();

  await page.getByRole("button", { name: "AI 정리" }).click();
  await expect(page.getByText(/구조화된 학습 상태/)).toBeVisible();
});
