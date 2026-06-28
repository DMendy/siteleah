import { test, expect } from '@playwright/test'

test.describe('Page Candidature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/candidature')
  })

  test('affiche le titre de la page', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Présente-moi ton besoin/i })).toBeVisible()
  })

  test('affiche le panel "Tu peux demander"', async ({ page }) => {
    await expect(page.getByText('Tu peux demander')).toBeVisible()
    await expect(page.getByText("Mettre de l'ordre dans ton administratif")).toBeVisible()
    await expect(page.getByText('Suivre tes relances et demandes clients')).toBeVisible()
    await expect(page.getByText('Clarifier tes priorités business')).toBeVisible()
    await expect(page.getByText('Construire un cadre de délégation simple')).toBeVisible()
  })

  test('le formulaire contient tous les champs requis', async ({ page }) => {
    await expect(page.getByLabel('Nom')).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Ton activité')).toBeVisible()
    await expect(page.getByLabel('Ton besoin prioritaire')).toBeVisible()
  })

  test('le bouton Envoyer est présent', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Envoyer ma demande' })).toBeVisible()
  })

  test('impossible de soumettre un formulaire vide', async ({ page }) => {
    await page.getByRole('button', { name: 'Envoyer ma demande' }).click()
    await expect(page).toHaveURL('/candidature')
    const nameInput = page.getByLabel('Nom')
    const validity  = await nameInput.evaluate((el) => el.validity.valid)
    expect(validity).toBe(false)
  })

  test('le formulaire accepte les données valides', async ({ page }) => {
    await page.getByLabel('Nom').fill('Marie Dupont')
    await page.getByLabel('Email').fill('marie@example.com')
    await page.getByLabel('Ton activité').fill('Consultante indépendante en marketing')
    await page.getByLabel('Ton besoin prioritaire').fill('Organisation et suivi des relances clients')
    await expect(page.getByLabel('Nom')).toHaveValue('Marie Dupont')
    await expect(page.getByLabel('Email')).toHaveValue('marie@example.com')
  })

  test('le champ email rejette un format invalide', async ({ page }) => {
    await page.getByLabel('Email').fill('pasunmail')
    const emailInput = page.getByLabel('Email')
    const validity   = await emailInput.evaluate((el) => el.validity.valid)
    expect(validity).toBe(false)
  })
})
