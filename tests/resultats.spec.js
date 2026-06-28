import { test, expect } from '@playwright/test'

test.describe('Page Résultats', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/resultats')
  })

  test('affiche le titre de la page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Je rends les résultats visibles/i })).toBeVisible()
  })

  test('affiche la section "Preuves concrètes"', async ({ page }) => {
    await expect(page.getByText('Preuves concrètes')).toBeVisible()
    await expect(page.getByText('Mes standards se mesurent sur le terrain.')).toBeVisible()
  })

  test('affiche les 4 images de résultats', async ({ page }) => {
    await expect(page.getByAltText('Exemple de suivi de tickets traités sur une semaine')).toBeVisible()
    await expect(page.getByAltText('Indicateur de satisfaction et remarques positives')).toBeVisible()
    await expect(page.getByAltText('Évaluation de la qualité rédactionnelle des réponses')).toBeVisible()
    await expect(page.getByAltText('Évaluation de la qualité de relation client')).toBeVisible()
  })

  test('affiche la section "Concrètement"', async ({ page }) => {
    await expect(page.getByText('Concrètement')).toBeVisible()
    await expect(page.getByText('Ce que je change quand je reprends ton back-office.')).toBeVisible()
  })

  test('affiche les 4 changements concrets', async ({ page }) => {
    await expect(page.getByText('Je rassemble tes demandes')).toBeVisible()
    await expect(page.getByText('Je pose et je suis les relances')).toBeVisible()
    await expect(page.getByText('Je rends tes priorités visibles')).toBeVisible()
    await expect(page.getByText("Je protège ton énergie")).toBeVisible()
  })

  test('affiche la section Témoignages', async ({ page }) => {
    await expect(page.getByText('Témoignages')).toBeVisible()
    await expect(page.getByText("Les retours reçus au fil de mes collaborations.")).toBeVisible()
  })

  test('CTA "Je veux déléguer" navigue vers /candidature', async ({ page }) => {
    await page.getByRole('button', { name: 'Je veux déléguer avec méthode' }).click()
    await expect(page).toHaveURL('/candidature')
  })

  test('le CTA est séparé des témoignages (margin suffisant)', async ({ page }) => {
    const testimonials = page.locator('.testimonials-section')
    const cta = page.getByRole('button', { name: 'Je veux déléguer avec méthode' })
    const testBox = await testimonials.boundingBox()
    const ctaBox  = await cta.boundingBox()
    const gap = ctaBox.y - (testBox.y + testBox.height)
    expect(gap).toBeGreaterThan(24)
  })
})
