import { test, expect } from '@playwright/test'

test.describe('Navigation globale', () => {
  test('navigue vers toutes les pages depuis la nav', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('navigation', { name: 'Navigation principale' })
      .getByRole('button', { name: 'Services' }).click()
    await expect(page).toHaveURL('/services')

    await page.getByRole('navigation', { name: 'Navigation principale' })
      .getByRole('button', { name: 'Résultats' }).click()
    await expect(page).toHaveURL('/resultats')

    await page.getByRole('navigation', { name: 'Navigation principale' })
      .getByRole('button', { name: 'Candidature' }).click()
    await expect(page).toHaveURL('/candidature')

    await page.getByRole('navigation', { name: 'Navigation principale' })
      .getByRole('button', { name: 'Présentation' }).click()
    await expect(page).toHaveURL('/')
  })

  test('le logo ramène à l\'accueil depuis n\'importe où', async ({ page }) => {
    await page.goto('/services')
    await page.getByRole('button', { name: 'Accueil Lea Jha' }).click()
    await expect(page).toHaveURL('/')
  })

  test('le bouton actif dans la nav correspond à la page courante', async ({ page }) => {
    await page.goto('/resultats')
    const nav = page.getByRole('navigation', { name: 'Navigation principale' })
    await expect(nav.getByRole('button', { name: 'Résultats' })).toHaveClass(/active/)
    await expect(nav.getByRole('button', { name: 'Services' })).not.toHaveClass(/active/)
  })

  test('le footer affiche le contact email', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'leah.jhayan.contact@gmail.com' })).toBeVisible()
  })

  test('le footer navigue vers les pages', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('navigation', { name: 'Navigation secondaire' })
      .getByRole('button', { name: 'Services' }).click()
    await expect(page).toHaveURL('/services')
  })

  test('chaque URL est directement accessible', async ({ page }) => {
    for (const url of ['/', '/services', '/resultats', '/candidature']) {
      await page.goto(url)
      await expect(page).toHaveURL(url)
      await expect(page.locator('main')).toBeVisible()
    }
  })
})
