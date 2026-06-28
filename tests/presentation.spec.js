import { test, expect } from '@playwright/test'

test.describe('Page Présentation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('affiche le logo Lea Jha', async ({ page }) => {
    await expect(page.getByRole('img', { name: 'Lea Jha' }).first()).toBeVisible()
  })

  test('affiche les boutons CTA hero', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Découvrir mes services' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Me confier ton organisation' })).toBeVisible()
  })

  test('affiche les 3 proof cards (Admin / Business / Ops)', async ({ page }) => {
    await expect(page.getByText('Admin', { exact: true })).toBeVisible()
    await expect(page.getByText('Business', { exact: true })).toBeVisible()
    await expect(page.getByText('Ops', { exact: true })).toBeVisible()
  })

  test('la photo portrait est visible', async ({ page }) => {
    await expect(page.getByAltText('Lea Jha à son bureau')).toBeVisible()
  })

  test('CTA "Découvrir mes services" navigue vers /services', async ({ page }) => {
    await page.getByRole('button', { name: 'Découvrir mes services' }).click()
    await expect(page).toHaveURL('/services')
  })

  test('CTA "Me confier ton organisation" navigue vers /candidature', async ({ page }) => {
    await page.getByRole('button', { name: 'Me confier ton organisation' }).click()
    await expect(page).toHaveURL('/candidature')
  })

  test('la navigation affiche les 4 liens', async ({ page }) => {
    const nav = page.getByRole('navigation', { name: 'Navigation principale' })
    await expect(nav.getByRole('button', { name: 'Présentation' })).toBeVisible()
    await expect(nav.getByRole('button', { name: 'Services' })).toBeVisible()
    await expect(nav.getByRole('button', { name: 'Résultats' })).toBeVisible()
    await expect(nav.getByRole('button', { name: 'Candidature' })).toBeVisible()
  })

  test('affiche les 3 journey cards', async ({ page }) => {
    await expect(page.locator('.journey-card').first()).toBeVisible()
    await expect(page.locator('.journey-card').nth(1)).toBeVisible()
    await expect(page.locator('.journey-card').last()).toBeVisible()
  })
})
