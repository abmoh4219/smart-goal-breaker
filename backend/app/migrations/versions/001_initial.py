"""Initial migration - create goals table

Revision ID: 001_initial
Revises: 
Create Date: 2025-12-08 15:10:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '001_initial'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create goals table
    op.create_table(
        'goals',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('original_goal', sa.String(), nullable=False),
        sa.Column('steps', sa.JSON(), nullable=False),
        sa.Column('complexity', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_goals_id'), 'goals', ['id'], unique=False)


def downgrade() -> None:
    # Drop goals table
    op.drop_index(op.f('ix_goals_id'), table_name='goals')
    op.drop_table('goals')
