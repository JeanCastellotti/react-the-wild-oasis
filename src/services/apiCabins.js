import supabase from './supabase'

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*')

  if (error) {
    throw new Error('Cabins could not be loaded')
  }

  return data
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    throw new Error('Cabin could not be deleted')
  }

  return data
}

export async function createEditCabin(newCabin, id) {
  // FIX: image peut aussi contenir un objet FileList vide lors de l'edit
  const hasImagePath = newCabin.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL
  )

  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll(
    '/',
    ''
  )
  const imagePath = hasImagePath
    ? newCabin.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/cabins/${imageName}`

  let query = supabase.from('cabins')

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }])

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id)

  const { data, error } = await query.select()

  if (error) throw new Error('Cabin could not be created')

  if (hasImagePath) return data

  const { error: storageError } = await supabase.storage
    .from('cabins')
    .upload(imageName, newCabin.image)

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id)
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    )
  }

  return data
}
