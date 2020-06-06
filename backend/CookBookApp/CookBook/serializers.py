from django.contrib.auth.models import User
from .models import Ingredient, Recipe, Comment, RecipeIngredientAssociative
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class RecipeIngredientAssociativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeIngredientAssociative
        fields = ['id', 'recipe', 'ingredient', 'amount']

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'fats', 'carbohydrates', 'proteins', 'calories']

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'author']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'author', 'recipe']