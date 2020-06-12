--
-- Create model Ingredient
--
CREATE TABLE [User]
(
    [id] int IDENTITY (1, 1) NOT NULL PRIMARY KEY,
    [username] nvarchar(200) NOT NULL UNIQUE,
    [password] nvarchar(200) NOT NULL,
    [email] nvarchar(200) NOT NULL UNIQUE,
    [token] nvarchar(100) NOT NULL UNIQUE,
);
--
-- Create model Ingredient
--
CREATE TABLE [CookBook_ingredient]
(
    [id] int IDENTITY (1, 1) NOT NULL PRIMARY KEY,
    [name] nvarchar(200) NOT NULL UNIQUE,
    [fats] double precision NOT NULL,
    [carbohydrates] double precision NOT NULL,
    [proteins] double precision NOT NULL,
    [calories] double precision NOT NULL
);
--
-- Create model Recipe
--
CREATE TABLE [CookBook_recipe]
(
    [id] int IDENTITY (1, 1) NOT NULL PRIMARY KEY,
    [title] nvarchar(100) NOT NULL UNIQUE,
    [description] nvarchar(200) NOT NULL,
    [author_id] int NOT NULL
);
--
-- Create model RecipeIngredientAssociative
--
CREATE TABLE [CookBook_recipeingredientassociative]
(
    [id] int IDENTITY (1, 1) NOT NULL PRIMARY KEY,
    [amount] double precision NOT NULL,
    [ingredient_id] int NOT NULL,
    [recipe_id] int NOT NULL
);
--
-- Create model Comment
--
CREATE TABLE [CookBook_comment]
(
    [id] int IDENTITY (1, 1) NOT NULL PRIMARY KEY,
    [content] nvarchar(200) NOT NULL,
    [author_id] int NOT NULL,
    [recipe_id] int NOT NULL
);

ALTER TABLE [CookBook_recipe] ADD CONSTRAINT [CookBook_recipe_author_id_fk_User_id] FOREIGN KEY ([author_id]) REFERENCES [User] ([id]);
ALTER TABLE [CookBook_comment] ADD CONSTRAINT [CookBook_comment_author_id_fk_User_id] FOREIGN KEY ([author_id]) REFERENCES [User] ([id]);
ALTER TABLE [CookBook_recipeingredientassociative] ADD CONSTRAINT [CookBook_recipe_id_5219806b_fk_CookBook_recipe_id] FOREIGN KEY ([recipe_id]) REFERENCES [CookBook_recipe] ([id]);
ALTER TABLE [CookBook_comment] ADD CONSTRAINT [CookBook_comment_recipe_id_fk_CookBook_recipe_id] FOREIGN KEY ([recipe_id]) REFERENCES [CookBook_recipe] ([id]);
ALTER TABLE [CookBook_recipeingredientassociative] ADD CONSTRAINT [CookBook_recipeingredientassociative_ingredient_id_fk_CookBook_ingredient_id] FOREIGN KEY ([ingredient_id]) REFERENCES [CookBook_ingredient] ([id]);
