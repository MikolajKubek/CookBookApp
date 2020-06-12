from django.shortcuts import render
from django.http import HttpResponse
from .models import User, Ingredient, Recipe, Comment, RecipeIngredientAssociative
from rest_framework import viewsets
from .serializers import UserSerializer, IngredientSerializer, RecipeSerializer, CommentSerializer, RecipeIngredientAssociativeSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status

class RecipeIngredientAssociativeViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = RecipeIngredientAssociative.objects.all()
    serializer_class = RecipeIngredientAssociativeSerializer

    def get_queryset(self):
        queryset = RecipeIngredientAssociative.objects.all()
        recipe_id = self.request.query_params.get('recipe', None)
        if recipe_id is not None:
            queryset = queryset.filter(recipe=recipe_id)

        return queryset

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class IngredientViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

class CommentViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        queryset = Comment.objects.all()
        recipe_id = self.request.query_params.get('recipe', None)
        if recipe_id is not None:
            queryset = queryset.filter(recipe=recipe_id)

        return queryset