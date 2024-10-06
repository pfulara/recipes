interface Ingredients {
  $id?: string;
  name?: string;
  quantity?: string;
}

interface Fase {
  $id?: string;
  name: string;
  description: string;
  ingredients: Ingredients[];
}

interface Recipe {
  $id?: string;
  slug: string;
  name: string;
  fases: Fase[];
  tags?: string[];
}
