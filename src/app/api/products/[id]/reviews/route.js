import { connect } from '@/app/lib/dbConnect';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  const { id } = await params;

  const reviewsCollection = await connect('reviews');
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get('sort') || 'latest';

  console.log(sort);
  let sortQuery = {};

  switch (sort) {
    case 'highest':
      sortQuery = {
        rating: -1,
        createdAt: -1,
      };
      break;

    case 'lowest':
      sortQuery = {
        rating: 1,
        createdAt: -1,
      };
      break;

    case 'helpful':
      sortQuery = {
        createdAt: -1,
      };
      break;

    case 'latest':
    default:
      sortQuery = {
        createdAt: -1,
      };
  }

  const reviews = await reviewsCollection
    .find({
      productId: new ObjectId(id),
    })
    .sort(sortQuery)
    .toArray();

  if (sort === 'helpful') {
    reviews.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
  }

  return Response.json(reviews);
}
