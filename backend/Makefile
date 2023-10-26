.PHONY: install
install:
	poetry install

.PHONY: migrate
migrate:
	poetry run python -m lg-webapp.manage migrate

.PHONY: migrations
migrations:
	poetry run python -m lg-webapp.manage makemigrations

.PHONY: showmigrations
showmigrations:
	poetry run python -m lg-webapp.manage showmigrations

.PHONY: run-server
run-server:
	poetry run python -m lg-webapp.manage runserver

.PHONY: superuser
superuser:
	poetry run python -m lg-webapp.manage createsuperuser

.PHONY: update
update: install migrate ;

.PHONY: test
test:
	poetry run coverage run --omit='*/venv/*' -m lg-webapp.manage test
