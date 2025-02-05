using System;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data;

public class SpecificationEvaluator<T> where T : BaseEntity
{
    public static IQueryable<T> GetQuery(IQueryable<T> qeury, ISpecification<T> spec)
    {
        if (spec.Criteria != null)
        {
            qeury = qeury.Where(spec.Criteria); // x => x.Brand == brand
        }

        if (spec.OrderBy != null)
        {
            qeury = qeury.OrderBy(spec.OrderBy);
        }

        if (spec.OrderByDescending != null)
        {
            qeury = qeury.OrderByDescending(spec.OrderByDescending);
        }

        if (spec.IsPagingEnabled)
        {
            qeury = qeury.Skip(spec.Skip).Take(spec.Take);
        }

        return qeury;
    }


    public static IQueryable<TResult> GetQuery<TSpec, TResult>(IQueryable<T> qeury,
        ISpecification<T, TResult> spec)
    {
        if (spec.Criteria != null)
        {
            qeury = qeury.Where(spec.Criteria); // x => x.Brand == brand
        }

        if (spec.OrderBy != null)
        {
            qeury = qeury.OrderBy(spec.OrderBy);
        }

        if (spec.OrderByDescending != null)
        {
            qeury = qeury.OrderByDescending(spec.OrderByDescending);
        }

        var selectQuery = qeury as IQueryable<TResult>;

        if (spec.Select != null)
        {
            selectQuery = qeury.Select(spec.Select);
        }

        if (spec.IsDistinct)
        {
            selectQuery = selectQuery?.Distinct();
        }

        if (spec.IsPagingEnabled)
        {
            selectQuery = selectQuery?.Skip(spec.Skip).Take(spec.Take);
        }

        return selectQuery ?? qeury.Cast<TResult>();
    }
}
