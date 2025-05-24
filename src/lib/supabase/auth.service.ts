import supabase from '.'

const signInWithGooglePopup = async () => {
  const result = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })

  return result
}

const logOut = async () => {
  await supabase.auth.signOut()
}

export { signInWithGooglePopup, logOut }
