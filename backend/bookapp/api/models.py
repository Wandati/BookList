from django.db import models

# Create your models here.
from faker import Faker
import random
class Book(models.Model):
    title=models.CharField(max_length=50,unique=True)
    author=models.CharField(max_length=50)
    publication_date=models.DateField()
    isbn=models.CharField(max_length=100,unique=True)

    def __str__(self):
        return self.title

    @classmethod
    def generate_dummy_data(cls, num_records=30):
        fake = Faker()
        for _ in range(num_records):
            title = fake.sentence(nb_words=3)
            author = fake.name()
            publication_date = fake.date_between(start_date='-50y', end_date='today')
            isbn = fake.isbn13()
            cls.objects.create(title=title, author=author, publication_date=publication_date, isbn=isbn)