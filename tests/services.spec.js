import { test, expect } from '@playwright/test'

test.describe('Page Services', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/services')
  })

  test('affiche le titre de la page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Je mets mon expertise business/i })).toBeVisible()
  })

  test('affiche les 4 cartes de service', async ({ page }) => {
    await expect(page.getByText('Gestion administrative')).toBeVisible()
    await expect(page.getByText('Assistanat business')).toBeVisible()
    await expect(page.getByText('Organisation opérationnelle')).toBeVisible()
    await expect(page.getByText('Support dirigeant')).toBeVisible()
  })

  test('affiche le panel "Ce que je mets en place"', async ({ page }) => {
    await expect(page.getByText('Ce que je mets en place')).toBeVisible()
    await expect(page.getByText('Un back-office clair, calme et fiable.')).toBeVisible()
  })

  test('affiche la liste de délégation', async ({ page }) => {
    await expect(page.getByText('Je range tes dossiers')).toBeVisible()
    await expect(page.getByText('Je suis tes relances')).toBeVisible()
    await expect(page.getByText('Je clarifie tes priorités')).toBeVisible()
    await expect(page.getByText('Je crée des process simples')).toBeVisible()
  })

  test('la photo de travail est visible', async ({ page }) => {
    await expect(page.getByAltText("Lea Jha organise le suivi d'un dossier")).toBeVisible()
  })

  test('CTA "Me parler de ton besoin" navigue vers /candidature', async ({ page }) => {
    await page.getByRole('button', { name: 'Me parler de ton besoin' }).click()
    await expect(page).toHaveURL('/candidature')
  })

  test('le nav indique Services comme actif', async ({ page }) => {
    const btn = page.getByRole('navigation', { name: 'Navigation principale' })
      .getByRole('button', { name: 'Services' })
    await expect(btn).toHaveClass(/active/)
  })
})
